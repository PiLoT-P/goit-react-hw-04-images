import {useCallback, useEffect, useState } from "react";
import { getDataServer } from '../../server/server.js';

import ImageGallery from "components/ImageGallery/ImageGallery.jsx";
import Button from "components/Button/Button.jsx";
import Loader from "components/Loader/Loader.jsx";
import Modal from "components/Modal/Modal.jsx";

import PropTypes from "prop-types";

const PhotoPage = ({queryText}) => {
    const [gallery, setGallery] = useState([]);
    const [disabledButton, setDisabledButton] = useState(false);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalData, setModalData] = useState(null);
    
    if (queryText !== query) {
        setPage(1);
        setQuery(queryText);
    }

    const setPhotos = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await getDataServer(query, page);
            if (data.hits.length < 12) {
                setDisabledButton(true);
            } else {
                setDisabledButton(false);
            }
            setGallery((prev) => page === 1 ? data.hits : [...prev, ...data.hits])
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false);
        }
    }, [page, query]);
    
    const changePage = () => {
        setPage((prev) => prev + 1);
    };

    const closeModal = () => {
        setModalData(null);
    };

    const openModal = (modalData) => {
        setModalData(modalData)
    }

    useEffect(() => {
        if (
            (query !== "") ||
            (page !== 1)
        ) {
            setPhotos();
        } 
    }, [page, query, setPhotos]);

    return (
        <>
            {isLoading && <Loader/>}
            {error ? (
                <h2>{error}</h2>
            ) : (
                <>
                    <ImageGallery gallery={gallery} openModal={openModal}/>
                    {gallery.length > 0 && !disabledButton ? (<Button onClick={changePage}/>): null}
                </>
            )}
            {modalData && (<Modal {...modalData} closeModal={closeModal}/>)}
        </>
    );
}

PhotoPage.propTypes = {
    queryText: PropTypes.string.isRequired,
}

export default PhotoPage;