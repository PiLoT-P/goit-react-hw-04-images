import { useState } from "react";

import css from "./Searchbar.module.css";

import PropTypes from "prop-types";

const Searchbar = ({onSubmit}) => {
    const [input, setInput] = useState('');

    const hendelSubmit = (e) => {
        e.preventDefault();
        onSubmit(input);
    }
    return (
        <header className={css.searchbar} onSubmit={hendelSubmit}>
            <form className={css.form}>
                <button type="submit" className={css.button}>
                <span className={css.label}>Search</span>
                </button>

                <input
                    className={css.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={input}
                    onChange={(e)=> setInput(e.target.value)}
                />
            </form>
        </header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Searchbar;