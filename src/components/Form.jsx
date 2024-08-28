import React, { useState } from 'react';

export default function Form(props) {
    const [formData, setFormData] = useState({ searchTerm: "" })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.onWeatherSearch(formData.searchTerm)

        setFormData({
            ...formData,
            searchTerm: "",
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <input
                    type='text'
                    name='searchTerm'
                    onChange={handleChange}
                    value={formData.searchTerm}
                    placeholder='Enter location'
                    style={{
                        borderRadius: '10px',
                        border: 'white',
                        padding: '5px',
                        outline: 'solid',
                        width: '150px',
                        marginRight: '20px',
                        marginLeft: '-25px',
                    }}
                />
                <input type="submit" value='Find My Location' style={{ borderRadius: '8px', cursor: 'pointer', padding: '2px'}}/>
            </form>
        </div>
    )
}