export default function validateBonus(bonus) {
    console.log(typeof bonus.price)
    return (bonus && bonus.name !== "" && bonus.price
     && typeof bonus.price === 'number' && isFinite(bonus.price) && bonus.price >= 0)
}