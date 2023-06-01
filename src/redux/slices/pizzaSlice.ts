import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

type Pizza = {
	id: string
	imageUrl: string
	title: string
	types: number[]
	sizes: number[]
	price: number
	rating: number
}

export type SearchPizzaParams = {
	sortBy: string
	order: string
	category: string
	search: string
	currentPage: string
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface PizzaSliceState {
	items: Pizza[]
	status: Status
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	'pizza/fetchPizzasStatus',
	async (params: SearchPizzaParams) => {
		const { sortBy, order, category, search, currentPage } = params
		const { data } = await axios.get<Pizza[]>(
			`https://64182e9275be53f451d80d40.mockapi.io/react-pizza-items?page=${currentPage}&limit=4${search}${category}&sortBy=${sortBy}&order=${order}`
		)
		return data
	}
)

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPizzas.pending, state => {
				state.status = Status.LOADING
				state.items = []
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.items = action.payload
				state.status = Status.SUCCESS
			})
			.addCase(fetchPizzas.rejected, state => {
				state.status = Status.ERROR
				state.items = []
			})
	},
})

export const selectPizzaData = (state: RootState) => state.pizza
export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
