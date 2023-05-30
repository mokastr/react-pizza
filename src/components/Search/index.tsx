import { useRef, useState, useCallback } from 'react'
// @ts-ignore нет поддержки TSс 2023г
import debounce from 'lodash.debounce'
import styles from './Search.module.scss'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'

const Search: React.FC = () => {
	const dispatch = useDispatch()
	const [value, setValue] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const updateSearchValue = useCallback(
		debounce((string: string) => {
			dispatch(setSearchValue(string))
		}, 150),
		[]
	)

	// Альтернативный вариант вместо useCallback

	// const updateSearchValue = useRef(
	// 	debounce(str => {
	// 		setSearchValue(str)
	// 	}, 1000)
	// ).current

	const onClickClear = () => {
		setValue('')
		dispatch(setSearchValue(''))
		inputRef.current?.focus()
	}

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
		updateSearchValue(e.target.value)
	}
	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				height="512"
				viewBox="0 0 512 512"
				width="512"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title />
				<path
					d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z"
					style={{
						fill: 'none',
						stroke: '#000',
						strokeMiterlimit: '10',
						strokeWidth: '32px',
					}}
				/>
				<line
					style={{
						fill: 'none',
						stroke: '#000',
						strokeLinecap: 'round',
						strokeMiterlimit: '10',
						strokeWidth: '32px',
					}}
					x1="338.29"
					x2="448"
					y1="338.29"
					y2="448"
				/>
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				placeholder="Поиск пицц..."
			/>
			{value && (
				<svg
					onClick={onClickClear}
					className={styles.clearIcon}
					height="512px"
					id="Layer_1"
					version="1.1"
					viewBox="0 0 512 512"
					width="512px"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
				</svg>
			)}
		</div>
	)
}

export default Search
