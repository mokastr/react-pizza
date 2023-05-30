import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import qs from 'qs'

import Categories from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import {
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice'
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice'
import { useAppDispatch } from '../redux/store'

const Home: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter)
	const { items, status } = useSelector(selectPizzaData)

	const isMounted = useRef(false)
	const isSearch = useRef(false)

	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page))
	}

	const getPizzas = () => {
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `&category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		dispatch(
			fetchPizzas({
				sortBy,
				order,
				category,
				search,
				currentPage: String(currentPage),
			})
		)
		window.scrollTo(0, 0)
	}

	// Если изменили параметры и был первый рендер
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			})
			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sort.sortProperty, currentPage])

	// Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))

			const sort = sortList.find(
				obj => obj.sortProperty === params.sortProperty
			)

			dispatch(setFilters({ ...params, sort }))
			isSearch.current = true
		}
	}, [])

	// Парсим параметры при первом рендере
	useEffect(() => {
		getPizzas()
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	const pizzas = items.map((obj: any) => (
		<Link key={obj.id} to={`/pizza/${obj.id}`}>
			<PizzaBlock {...obj} />
		</Link>
	))
	const skeletons = [...Array(6)].map((_, i) => <Skeleton key={i} />)

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === 'error' ? (
				<div className="content__error-info">
					<h2>Произошла ошибка 😕</h2>
					<p>
						К сожалению, не удалось получить питсы. Попробуйте повторить попытку
						позже.
					</p>
				</div>
			) : (
				<div className="content__items">
					{status === 'loading' ? skeletons : pizzas}
				</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)
}

export default Home
