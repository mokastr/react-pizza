import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const FullPizza: React.FC = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [pizza, setPizza] = useState<{
		imageUrl: string
		title: string
		price: number
	}>()

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					'https://64182e9275be53f451d80d40.mockapi.io/react-pizza-items/' + id
				)
				setPizza(data)
			} catch (error) {
				alert('Ошибка при загрузке')
				navigate('/')
			}
		}
		fetchPizza()
	}, [])

	// pizza : {imageUrl: string, title: string price: number} | undefined
	//  Чтобы исключить undefined надо или сделать проверку, или задать для каждого свойства начальный state ( useState({imageUrl: "", title: "", price: 0}) )

	if (!pizza) {
		return (
			<div className="container">
				<h2>Загрузка...</h2>
			</div>
		)
	}

	return (
		<div className="container">
			<img src={pizza.imageUrl} alt="" />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price}</h4>
		</div>
	)
}

export default FullPizza
