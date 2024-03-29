import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { CreateDialog, EditDialog, ViewDialog } from './modules';
import { useMode } from '@/context/ModeContext';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	onEdit: () => void;
	onDelete: () => void;
}

const Modal = ({ isOpen, onClose, onEdit, onDelete, children }: ModalProps) => {
	const { mode, setMode, selectedCardData, submitting } = useMode();
	const theme = useTheme();

	const handleBack = () => {
		setMode('view');
	};

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			fullWidth
			sx={{
				background: '#0C0E13',
				'.MuiDialog-container': {
					[theme.breakpoints.up('md')]: {
						padding: '40px 24px',
					},
					padding: '8px',
					boxSizing: 'border-box',
					height: '100%',
				},
				'.MuiPaper-rounded': {
					background: '#16191F',
					borderRadius: '12px',
					maxHeight: '100%',
				},
				'.MuiDialog-paperFullWidth': {
					margin: '0',
					maxWidth: mode === 'view' ? '980px' : '744px',
					width: '100%',
					'&::-webkit-scrollbar': {
						display: 'none',
					},
				},
			}}
		>
			<DialogTitle
				sx={{
					[theme.breakpoints.up('md')]: {
						padding: '16px 24px',
					},
					display: 'flex',
					justifyContent: 'space-between',
					color: '#ffffff',
					fontFamily: 'Figtree-Bold,sans-serif',
					fontSize: '18px',
					fontWeight: '700',
					lineHeight: '21.6px',
					borderBottom: mode !== 'create' ? '1px solid #23272F' : '',
				}}
			>
				{mode === 'create' && (
					<CreateDialog
						title='Create Post'
						onClose={onClose}
					/>
				)}
				{mode === 'view' && (
					<ViewDialog
						data={selectedCardData}
						onView={onClose}
						onDelete={onDelete}
					/>
				)}
				{mode === 'edit' && (
					<EditDialog
						data={selectedCardData}
						onClose={handleBack}
						onDelete={onDelete}
					/>
				)}
			</DialogTitle>
			<DialogContent
				className='modal-content'
				sx={{
					[theme.breakpoints.up('md')]: {
						padding: mode === 'create' ? ' 0 24px 24px!important' : ' 24px 24px 24px!important',
					},
					padding: '24px!important',
					color: '#ffffff',
					overflow: 'unset',
					display: mode === 'view' ? 'flex' : 'block',
					gap: '40px',
					'@media screen and (max-width:960px)': {
						flexDirection: 'column',
						gap: '0',
					},
					background: mode !== 'create' ? '#0C0E13' : '',
					'.react-select-container': {
						paddingLeft: mode === 'create' ? '68px' : '0',
					},
					'@media screen and (max-width:480px)': {
						'.react-select-container': {
							paddingLeft: '0',
						},
					},
				}}
			>
				{children}
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
