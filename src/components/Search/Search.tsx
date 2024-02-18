import React, { useState } from 'react'
import "./index.css"
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate'
import {genGeoDBConfig } from '../../api/api'
import axios from 'axios'


const Search = ({onSearchChange}:any) => {
    const [search, setSearch] = useState<string | null>(null)
    const handleOnChange = (searchdata: any) => {
        setSearch(searchdata)
        onSearchChange(searchdata)
    }
    const loadOptions = async (input: any) => {
        try {
            const response = await axios.request(genGeoDBConfig(input));
            const data = response.data.data
            return {
                options: data.map((city: any) => {
                    return {
                        value: city.name.replace(/\s+district$/, ""),
                        label: `${city.name.replace(/\s+district$/, "")} ,${city.region} ,${city.country}`,
                        lat:city.latitude,
                        lon:city.longitude,
                    }
                })
            }
        } catch (error) {
            console.error(error);
            return {
                options: []
            }
        }
    }


    return (
        <div className='search'>
            <AsyncPaginate placeholder="Search City" debounceTimeout={600} value={search} onChange={handleOnChange} loadOptions={loadOptions} />
        </div>
    )
}

export default Search