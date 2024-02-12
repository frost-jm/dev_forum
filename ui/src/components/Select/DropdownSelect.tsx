import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

import { GET_TAGS, ADD_TAG } from '@/graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { useMode } from '@/context/ModeContext';

const DropdownSelect = () => {
	const [selectedOptions, setSelectedOptions] = useState([]);

	const { loading, error, data } = useQuery(GET_TAGS);
	const [createTag] = useMutation(ADD_TAG);

	const { setSelectedPostTag, selectedCardData, mode } = useMode();

	if (loading) return 'Loading...';

	const tags = data.tags;

	const options = tags.map((tag: { id: any; tag: any }) => ({
		value: tag.id,
		label: tag.tag,
	}));

	const value = mode === 'edit' ? selectedCardData && selectedCardData.tags.map((tag) => ({ label: tag, value: tag })) : selectedOptions;

	const handleChange = (newValue: any) => {
		setSelectedOptions(newValue);

		const selectedValues = newValue.map((option: { value: string }) => option.value);

		setSelectedPostTag(selectedValues);
	};

	const handleCreate = async (inputValue: any) => {
		try {
			const { data: mutationData } = await createTag({
				variables: { name: [inputValue] },
				refetchQueries: [{ query: GET_TAGS }],
			});

			if (mutationData.createdTag.success) {
				console.log('Tag created successfully:', mutationData.createdTag.data);
			} else {
				console.error('Tag creation failed:', mutationData.createdTag.message);
			}
		} catch (error) {
			console.error('GraphQL mutation error:', error.message);
		}
	};

	return (
		<CreatableSelect
			isMulti
			onChange={handleChange}
			onCreateOption={handleCreate}
			options={options}
			value={value}
			styles={{
				control: (baseStyles, state) => ({
					...baseStyles,
					color: '#000000',
				}),
				option: (baseStyles, state) => ({
					...baseStyles,
					color: '#000000',
				}),
			}}
		/>
	);
};

export default DropdownSelect;
