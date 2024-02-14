import React, { useState } from 'react';
import { Chip, Button, Menu, MenuItem, Box } from '@mui/material';
import Tags from '../Tags';

const TagsFilter = ({ tags }: any) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChipClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleOthersClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClearAll = () => {
    setSelectedTags([]);
  };

  const selectedTagsCount = tags.filter((tag) =>
    selectedTags.includes(tag)
  ).length;

  return (
    <div>
      <Button
        endIcon={<span>▼</span>}
        onClick={handleOthersClick}
        sx={{
          backgroundColor: '#FFFFFF',
          padding: '6px 8px 6px 12px',
          color: '#11141B',
          borderRadius: '50px',
          fontFamily: 'Figtree-SemiBold,sans-serif',
          fontWeight: '600',
          fontSize: '12px',
          lineHeight: '1.2',
          textTransform: 'capitalize',

          ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            color: '#ffffff',
          },
        }}
      >
        Others
      </Button>
      {tags.slice(0, 4).map((tag) => (
        <Chip
          key={tag}
          label={tag}
          onClick={() => handleChipClick(tag)}
          onDelete={
            selectedTags.includes(tag) ? () => handleChipClick(tag) : undefined
          }
          color={selectedTags.includes(tag) ? 'primary' : 'default'}
        />
      ))}
      {tags.length > 4 && (
        <>
          <Menu
            id="tags-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            // open={true}
            onClose={() => setAnchorEl(null)}
            sx={{
              '.css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
                backgroundColor: '#25282E',
                border: '1px solid #2C313C',
                borderRadius: '12px',
                maxWidth: '414px',
                width: '100%',
                height: 'max-content',
                padding: '24px',
                color: '#fff',
              },

              ul: {
                padding: '0',

                li: {
                  padding: '0',
                  width: 'max-content',
                },
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'Figtree-Bold,sans-serif',
                fontWeight: '700',
              }}
            >
              <Box sx={{ fontSize: '16px', lineHeight: '1.5' }}>
                Selected Tags
              </Box>
              {selectedTags.length > 0 && (
                <Box
                  sx={{
                    borderRadius: '20px',
                    backgroundColor: '#0A80B2',
                    padding: '2px, 7px, 2px, 7px',
                    width: '21px',
                    height: '21px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    lineHeight: '1.4',
                  }}
                >
                  {selectedTagsCount > 0 && <span>{selectedTagsCount}</span>}
                </Box>
              )}
            </Box>

            <Box
              sx={{
                borderTop: '1px solid rgba(255, 255, 255, .10)',
                borderBottom: '1px solid rgba(255, 255, 255, .1)',
                padding: '12px 0',
                marginTop: '12px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
              }}
            >
              {tags.slice(4).map((tag) => (
                <MenuItem
                  key={tag}
                  onClick={() => handleChipClick(tag)}
                  selected={selectedTags.includes(tag)}
                >
                  <Tags name={tag} active={selectedTags.includes(tag)}></Tags>
                </MenuItem>
              ))}
            </Box>
            <MenuItem
              onClick={handleClearAll}
              sx={{
                fontFamily: 'Figtree-Medium,sans-serif',
                fontWeight: '500',
                color: '#4FBBE9',
                margin: '12px 0 0 auto',
                display: 'flex',
                gap: '4px',
              }}
            >
              <Box
                sx={{
                  width: '24px',
                  height: '24px',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.8'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.77342 5.90943C7.14247 5.34247 7.77312 5.00049 8.44961 5.00049H19.0022C20.1067 5.00049 21.0022 5.89592 21.0022 7.00049V17.0005C21.0022 18.1051 20.1067 19.0005 19.0022 19.0005H8.44966C7.77311 19.0005 7.14243 18.6585 6.77339 18.0914L3.51905 13.091C3.08737 12.4277 3.0874 11.5722 3.51913 10.909L6.77342 5.90943ZM19.0022 7.00049L8.44961 7.00049L5.19531 12L8.44966 17.0005H19.0022V7.00049ZM10.2908 9.28987C10.6813 8.89934 11.3145 8.89934 11.705 9.28987L12.9979 10.5828L14.2908 9.28987C14.6813 8.89934 15.3145 8.89934 15.705 9.28987C16.0955 9.68039 16.0955 10.3136 15.705 10.7041L14.4121 11.997L15.705 13.2899C16.0955 13.6804 16.0955 14.3136 15.705 14.7041C15.3145 15.0946 14.6813 15.0946 14.2908 14.7041L12.9979 13.4112L11.705 14.7041C11.3145 15.0946 10.6813 15.0946 10.2908 14.7041C9.90025 14.3136 9.90025 13.6804 10.2908 13.2899L11.5837 11.997L10.2908 10.7041C9.90025 10.3136 9.90025 9.68039 10.2908 9.28987Z' fill='%234FBBE9'/%3E%3C/g%3E%3C/svg%3E%0A")`,
                }}
              ></Box>
              <Box>Clear All</Box>
            </MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};

export default TagsFilter;
