import React from 'react';

import './styles.css'

type SearchBoxProps = {
	submitSearch: () => void;
	searchValue: string;
	setSearchValue: (e: string ) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({		
	submitSearch,
	searchValue,
	setSearchValue,
}) => {

	return (
		<div className='col col-sm-4'>
			<input
				name="input"
				data-testid='movie-input'
				className='movie-input'
				value={searchValue}
				onChange={(event) => setSearchValue(event.target.value)}
                placeholder='Type to search...'
                required
			></input>
			<button type="submit" onClick={submitSearch}>
				Search
			</button>
		</div>
	);
};

export default SearchBox;