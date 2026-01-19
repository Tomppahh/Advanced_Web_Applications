type TItem = {
	id: string;
	text: string;
	clicked: boolean;
};

interface ListProps {
	header: string;
	items: TItem[];
	updateList: (id: string) => void;
}

function MyList({ header, items, updateList }: ListProps) {
	return (
		<div>
			<h2>{header}</h2>
			<ol>
				{items.map((item) => (
					<li
						key={item.id}
						onClick={() => updateList(item.id)}
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
