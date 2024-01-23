import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Button from './Button/Button';
import UserContext from '@/context/UserContext';
import { useContext } from 'react';

interface UserDetailsProp {
	action: () => void;
}

const UserDetails = ({ action }: UserDetailsProp) => {
	const { currentUserDetails } = useContext(UserContext);
	const theme = useTheme();

	const fullName = currentUserDetails?.firstName + ' ' + currentUserDetails?.lastName;

	return (
		<Box
			sx={{
				[theme.breakpoints.up('md')]: {
					maxWidth: '360px',
					width: '100%',
					borderRadius: '12px',
				},
				display: 'flex',
				maxWidth: '100%',
				padding: '24px',
				flexDirection: 'column',
				alignItems: 'flex-start',
				gap: '18px',
				color: '#ffffff',
				background: '#11141B',
				border: '1px solid rgba(38, 45, 58, 0.30)',
			}}
		>
			<Box>
				<Box
					sx={{
						fontFamily: 'Figtree-Bold,sans-serif',
						fontWeight: '700',
						fontSize: '22px',
						lineHeight: '26.4px',
					}}
				>
					{fullName}
				</Box>
				<Box
					sx={{
						marginTop: '6px',
						fontFamily: 'Figtree-Regular,sans-serif',
						fontWeight: '400',
						fontSize: '16px',
						lineHeight: '19.2px',
						opacity: '0.6',
					}}
				>
					View my posts
				</Box>
			</Box>
			<Button
				text='Post'
				action={() => action()}
			/>
		</Box>
	);
};

export default UserDetails;
