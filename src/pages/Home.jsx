import { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'
import { setCategoryId } from '../redux/slices/filterSlice'

const Home = () => {
	const dispatch = useDispatch()
	const { categoryId, sort } = useSelector(state => state.filter)

	const { searchValue } = useContext(SearchContext)
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)

	const onChangeCategory = id => {
		dispatch(setCategoryId(id))
	}

	useEffect(() => {
		setIsLoading(true)

		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `&category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		fetch(
			`https://64182e9275be53f451d80d40.mockapi.io/react-pizza-items?page=${currentPage}&limit=4${search}${category}&sortBy=${sortBy}&order=${order}`
		)
			.then(res => res.json())
			.then(json => setItems(json))
			.catch(err => console.warn(err))
			.finally(() => setIsLoading(false))
		window.scrollTo(0, 0)
	}, [categoryId, sort, searchValue, currentPage])

	const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
	const skeletons = [...Array(6)].map((_, i) => <Skeleton key={i} />)

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>
			<Pagination onChangePage={number => setCurrentPage(number)} />
		</div>
	)
}

export default Home
