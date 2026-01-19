type TItem = {
	id: string;
	text: string;
	clicked: boolean;
};

interface ListProps {
	header: string;
	items: TItem[];
	onItemClick: (id: string) => void;
}

function MyList({ header, items, onItemClick }: ListProps) {
	return (
		<div>
			<h2>{header}</h2>
			<ol>
				{items.map((item) => (
					<li
						key={item.id}
						onClick={() => onItemClick(item.id)}
						style={{
							textDecoration: item.clicked ? 'line-through' : 'none',
							cursor: 'pointer',
						}}
					>
						{item.text}
					</li>
				))}
			</ol>
		</div>
	);
}

export default MyList;
