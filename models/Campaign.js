const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const Bonus = require("./Bonus");
const Image = require("./Image");
const Tag = require("./Tag");
const News = require("./News");
const Rating = require("./Rating");
const User = require("./User");
const Category = require("./Category");

Campaign = sequelize.define("campaign", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    targetMoney: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      get() {
        const stringValue = this.getDataValue("targetMoney");
        return parseInt(stringValue, 10);
      }
    },
    currentMoney: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      get() {
        const stringValue = this.getDataValue("currentMoney");
        return parseInt(stringValue, 10);
      }
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    // status: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    //   defaultValue: "active"
    // },  
    status: {
        type: Sequelize.VIRTUAL, 
        get() {
          if(Date.now() > this.endDate && this.currentMoney < this.targetMoney)
            return "failed";
          if(Date.now() <= this.endDate && this.currentMoney < this.targetMoney)
            return "active"
          return "succeed";        
        },
      },  
    creationDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: function() {
        return Date.now()
      }
    },
    lastModificationDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: function() {
        return Date.now()
      }
    },
    averageRating: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
  }
);

Campaign.getSearchVector = function() {
  return 'tsv';
}

Campaign.addFullTextIndex = function() {
  console.log("==============adding index=========================")
  if(sequelize.options.dialect !== 'postgres') {
    console.log('Not creating search index, must be using POSTGRES to do this');
    return;
  }

  let searchFields = ['name', 'description'];
  let Campaign = this;

  var vectorName = Campaign.getSearchVector();
  sequelize
    .query('ALTER TABLE "' + Campaign.tableName + '" ADD COLUMN "' + vectorName + '" TSVECTOR')
    .then(function() {
        return sequelize
                .query('UPDATE "' + Campaign.tableName + '" SET "' + vectorName 
                  + '" = to_tsvector(\'english\', ' 
                  + searchFields.join(' || \' \' || ') + ')')
    }).then(function() {
        return sequelize
                .query('CREATE INDEX campaign_search_index ON "' + Campaign.tableName 
                + '" USING gin("' + vectorName + '");')
    }).then(function() {
        return sequelize
                .query('CREATE TRIGGER campaign_vector_update BEFORE INSERT OR UPDATE ON "'
                  + Campaign.tableName + '" FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger("'
                  + vectorName + '", \'pg_catalog.english\', ' + searchFields.join(', ') + ')')
    })
}

Campaign.search = async function(query, count) {
  if(!count)
    count = 5;
  console.log("==============searching=========================")
  if(sequelize.options.dialect !== 'postgres') {
      console.log('Search is only implemented on POSTGRES database');
      return;
  }

  var Campaign = this;

  // query = sequelize.getQueryInterface().escape(query);
  // count = sequelize.getQueryInterface().escape(count);
  console.log(query);
  
  return await sequelize
          .query('SELECT * FROM "' + Campaign.tableName + '" WHERE "' 
          + Campaign.getSearchVector() + '" @@ plainto_tsquery(\'english\', ' 
          + query + ') LIMIT ' + count, {
            type:  Sequelize.QueryTypes.SELECT,
            model: Campaign,
            replacments: {query, count}
          });
}

// Campaign.belongsTo(User);
// Campaign.belongsTo(Category);
// Campaign.hasMany(Bonus, { onDelete: "cascade" });
// Campaign.hasMany(Rating, { onDelete: "cascade" });
// Campaign.hasMany(Image, { onDelete: "cascade" });
// Campaign.hasOne(Video, { onDelete: "cascade" });
// Campaign.hasMany(News, { onDelete: "cascade" });
// Campaign.belongsToMany(Tag, {
//   through: "campaign_tag",
// });

module.exports = Campaign;