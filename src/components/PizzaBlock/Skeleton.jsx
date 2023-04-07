import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = props => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={500}
		viewBox="0 0 280 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<rect x="42" y="46" rx="0" ry="0" width="0" height="1" />
		<rect x="102" y="133" rx="0" ry="0" width="0" height="1" />
		<rect x="204" y="217" rx="0" ry="0" width="1" height="1" />
		<circle cx="134" cy="134" r="125" />
		<rect x="0" y="276" rx="10" ry="10" width="280" height="25" />
		<rect x="0" y="331" rx="10" ry="10" width="280" height="88" />
		<rect x="2" y="447" rx="10" ry="10" width="95" height="30" />
		<rect x="124" y="438" rx="25" ry="25" width="152" height="45" />
	</ContentLoader>
)

export default Skeleton
