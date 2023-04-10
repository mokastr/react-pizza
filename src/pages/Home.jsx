import { useEffect, useState, useContext } from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'

const Home = () => {
	const { searchValue } = useContext(SearchContext)
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [categoryId, setCategoryId] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	const [sortType, setSortType] = useState({
		name: 'популярности',
		sortProperty: 'rating',
	})

	useEffect(() => {
		setIsLoading(true)

		const sortBy = sortType.sortProperty.replace('-', '')
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		fetch(
			`https://64182e9275be53f451d80d40.mockapi.io/react-pizza-items?page=${currentPage}&limit=4${category}${search}&sortBy=${sortBy}&order=${order}}`
		)
			.then(res => res.json())
			.then(json => setItems(json))
			.catch(err => console.warn(err))
			.finally(() => setIsLoading(false))
		window.scrollTo(0, 0)
	}, [categoryId, sortType, searchValue, currentPage])

	// // Для статичного поиска
	// const pizzas = items
	// 	.filter(obj => {
	// 		if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
	// 			return true
	// 		}
	// 		return false
	// 	})
	// 	.map(obj => <PizzaBlock key={obj.id} {...obj} />)

	const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
	const skeletons = [...Array(6)].map((_, i) => <Skeleton />)

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					value={categoryId}
					onChangeCategory={id => setCategoryId(id)}
				/>
				<Sort value={sortType} onChangeSort={id => setSortType(id)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>
			<Pagination onChangePage={number => setCurrentPage(number)} />
		</div>
	)
}

export default Home
