export const categories = [
	{ name: 'Все' },
	{ name: 'Мясные' },
	{ name: 'Вегетарианская' },
	{ name: 'Гриль' },
	{ name: 'Острые' },
	{ name: 'Закрытые' },
]

const Categories = ({ value, onChangeCategory }) => {
	return (
		<div className="categories">
			<ul>
				{categories.map((obj, i) => (
					<li
						key={i}
						onClick={() => onChangeCategory(i)}
						className={value === i ? 'active' : ''}
					>
						{obj.name}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories
