import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles'
const Article = ({ flags, name, cca2, cca3, altSpellings, idd }) => {
    const [open, setOpen] = useState(false)
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            <article className='overflow-hidden bg-white rounded-lg shadow-sm'>
                <img src={flags.png} alt='' className='object-cover w-full md:h-60' />
                <div className='p-4'>
                    <h2 className='mb-2 text-lg font-bold cursor-pointer text-white-900' onClick={handleOpen}>{name.official}</h2>

                    <ul className='flex flex-col items-start justify-start gap-2 text-[14px]'>
                        <li>
                            Country Code 2: {cca2}
                        </li>
                        <li>
                            Country Code 3: {cca3}
                        </li>
                        <li>
                            Alternative Name: {altSpellings}
                        </li>
                        <li>
                            Country Calling Codes:{idd.root} {idd.suffixes}
                        </li>
                    </ul>
                </div>
            </article>
            <Dialog
                maxWidth='md'
                open={open}
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "500px",  // Set your width here
                        }
                    }
                }
                }
            >
                <DialogTitle>{name.official}</DialogTitle>
                <DialogContent>
                    {/** Render Additinal information here */}
                    <img src={flags.png} alt='' className='object-cover md:w-100 md:h-100 ' />
                    <ul className='flex flex-col items-start justify-start gap-2 pt-4 text-[14px]'>
                        <li>
                            Country Code 2: {cca2}
                        </li>
                        <li>
                            Country Code 3: {cca3}
                        </li>
                        <li>
                            Alternative Name: {altSpellings}
                        </li>
                        <li>
                            Country Calling Codes:{idd.root}
                        </li>
                        <li>
                         Suffixes Code: {idd.suffixes}
                        </li>
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Article;