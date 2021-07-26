import React from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
export default function SearchCountry({ countries, handleOnChange }) {
    return (
        <>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="card card-mini mb-4">
                        <div className="card-body">
                            <Autocomplete
                                id="combo-box-demo"
                                options={countries}
                                getOptionLabel={(option) => option.Country}
                                onChange={handleOnChange}
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} label="Tìm kiểm quốc gia" variant="outlined" />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
