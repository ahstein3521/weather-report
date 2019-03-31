import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

const SearchForm = props => {

	const [value, setValue] = useState('');

	const handleOnChange = e => {
		if (!isNaN(e.target.value) && e.target.value.length < 6) {
			setValue(e.target.value)
		}
	}

	const handleOnSubmit = e => {
		e.preventDefault();
		if (value.length === 5) {
			props.onSubmit(value);
			setValue('');
		}
		
	}

	return (
		<form onSubmit={handleOnSubmit}>
			<TextField 
				fullWidth
				label="Search by zipcode"
				onChange={handleOnChange}
				value={value}
			/>
		</form>
	)
}

export default SearchForm;