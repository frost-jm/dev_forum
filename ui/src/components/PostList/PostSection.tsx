import { useContext, useMemo, useEffect } from 'react';

import { useQuery } from '@apollo/client';
import { Box, Grid } from '@mui/material';

import UserContext from '@/context/UserContext';
import { useMode } from '@/context/ModeContext';

import { GET_POSTS } from '@/graphql/queries';

import { calculatePages, getBindnameForUserId, getColorForUserId } from '@/utils/helpers';

import PostItem from './PostItem';
import Filter from '@/components/Filter/Filter';
import PaginationControl from '@/components/PostList/Pagination';
import FilterEmpty from '@/components/Filter/FilterEmpty';
import Loader from '@/components/Loader/Loader';

const PostSection = () => {
	const { data, hailstormLoading } = useContext(UserContext);
	const { setMode, render, setPostTracker, mode, searchQuery, selectedTags, selectedSortBy, selectedPostedBy, setSelectedCardData, setModalOpen, page, setPage } = useMode();

	const {
		loading,
		error,
		data: postData,
		refetch,
	} = useQuery(GET_POSTS, {
		variables: {
			filter: {
				orderBy: selectedSortBy ? selectedSortBy : {},
				tags: selectedTags.includes('All') ? [] : selectedTags,
				...(selectedPostedBy !== '100' ? { createdBy: selectedPostedBy } : ''),
				title: searchQuery,
			},
			pagination: {
				page: page,
			},
		},
	});

	let totalPages;

	if (!loading && !hailstormLoading && postData) {
		const totalPost = postData.posts.count;
		const pageSize = 9;

		totalPages = calculatePages(totalPost, pageSize);
	}

	const processedPosts = useMemo(() => {
		if (!loading && !hailstormLoading && postData) {
			return postData.posts.items.map((post: any) => ({
				...post,
				created_by: {
					bindName: getBindnameForUserId(data, post.created_by),
					email: post.created_by,
				},
				color: getColorForUserId(post.created_by),
			}));
		}

		return [];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, hailstormLoading, postData]);

	const handleViewClick = (data: any) => {
		const formattedData = {
			...data,
			post: {
				blocks: [JSON.parse(data.title), ...JSON.parse(data.post)],
				explanation: data.explanation,
			},
		};

		setSelectedCardData(formattedData);
		setMode('view');
		setModalOpen(true);
	};

	useEffect(() => {
		refetch();

		if (postData && postData.posts.items.length) {
			setPostTracker(postData.posts.items.length);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [postData, mode, page, render]);

	return (
		<Box
			display='flex'
			flexDirection='column'
			sx={{
				height: 'calc(100dvh - 80px)',
				'@media screen and (min-width:1492px)': {
					minWidth: '1040px',
					maxWidth: '1040px',
				},
				'@media screen and (max-width:1492px)': {
					width: '100%',
				},
			}}
		>
			<Filter />
			{processedPosts ? (
				<>
					{processedPosts && processedPosts.length > 0 ? (
						<>
							<Grid
								container
								display='grid'
								sx={{
									marginTop: '8px',
									width: '100%',
									maxWidth: '1040px',
									gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
									'> .MuiGrid-root.MuiGrid-item': {
										flexBasis: 'auto',
										maxWidth: '341px',
									},
									'@media screen and (max-width:1440px)': {
										maxWidth: '100%',
										gridTemplateColumns: '50% 1fr',
										'> .MuiGrid-root.MuiGrid-item': {
											flexBasis: 'auto',
											maxWidth: '100%',
										},
									},
									'@media screen and (max-width:768px)': {
										marginTop: '0',
										padding: '8px',
										gridTemplateColumns: '100%',
										'> .MuiGrid-root.MuiGrid-item': {
											maxWidth: '100%',
										},
									},
								}}
								gap='8px'
							>
								{processedPosts &&
									processedPosts.map((data: any, index: number) => {
										return (
											<Grid
												item
												xl={3}
												key={index}
												rowGap='8px'
												columnGap='8px'
											>
												<PostItem
													data={data}
													handleClick={() => handleViewClick(data)}
												/>
											</Grid>
										);
									})}
							</Grid>
							<Box
								sx={{
									padding: '8px 24px 24px',
									marginTop: 'auto',
								}}
							>
								<PaginationControl
									totalPages={totalPages}
									currentPage={page}
									handlePageChange={(event, value) => {
										setPage(value);
									}}
								/>
							</Box>
						</>
					) : (
						<FilterEmpty />
					)}
				</>
			) : (
				<Loader />
			)}
		</Box>
	);
};

export default PostSection;
