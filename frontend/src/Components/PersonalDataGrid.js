import { useState } from 'react'
import { useSelector } from 'react-redux';
//Material
import CustomSelect from './CustomSelect.js'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UploadButton from '../Components/UploadButton.js'
//Components
import CustomErrorAlert from './CustomErrorAlert.js';
import CustomLoading from './CustomLoading.js'
import CustomLabels from './CustomLabels.js'

//Data & Contants
import { txtPersonalData, URL_TEST_INGLES } from '../Utils/consts.js'

export default function PersonalDataGrid(props) {
    const { data, loading, setRequest, request } = props;

    const [textValues, setTextValues] = useState('');
    const handleTextChange = (index, value) => {
        const updatedValues = [...textValues];
        const newRequest = request
        updatedValues[index] = value;
        setTextValues(updatedValues);
        switch (index) {
            case 0:
                newRequest.id = Number(updatedValues[index])
                newRequest.personalData.legajo = Number(updatedValues[index])
                break;
            case 1:
                newRequest.personalData.fechaDeIngreso = updatedValues[index]
                break;
            case 2:
                newRequest.personalData.puesto = updatedValues[index]
                break;
            case 3:
                newRequest.personalData.seniority = updatedValues[index]
                break;
        }

        setRequest(newRequest)
    };

    const errorPersonalData = useSelector(state => state.personalData.errorPersonalData);
    const lists = useSelector(state => state.listsData.listsData)
    const errorLists = useSelector(state => state.listsData.errorListsData)
    const loadingLists = useSelector(state => state.listsData.loading)

    return (
        //Container general 
        <>
            {(errorPersonalData || errorLists) ?
                <Grid >
                    <CustomErrorAlert />
                </Grid >
                :
                (loading || loadingLists) ?
                    <CustomLoading loading={loading} />
                    :
                    (!data || !lists) ?
                        <CustomLabels noData={true} />
                        :

                        <>
                            <Grid container>
                                <Grid item container={true} direction="row" alignItems="flex-end" >
                                    {/* LABEL TEXT */}
                                    <Grid item>
                                        {txtPersonalData.slice(0, 6).map((txt, index) => (
                                            <CustomLabels key={index} text={txt} />
                                        ))}
                                    </Grid>
                                    {/* PERSONAL INFORMATION */}
                                    <Grid xs item container={true} direction="column"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                    >
                                        <TextField
                                            value={textValues[0] ?? data.legajo ?? ""}
                                            fullWidth
                                            onChange={(e) => handleTextChange(0, e.target.value)}
                                        />
                                        <TextField
                                            value={textValues[1] ?? data.fechaDeIngreso ?? ""}
                                            fullWidth
                                            onChange={(e) => handleTextChange(1, e.target.value)}
                                        />
                                        <TextField
                                            value={textValues[2] ?? data.puesto ?? ""}
                                            fullWidth
                                            onChange={(e) => handleTextChange(2, e.target.value)}
                                        />
                                        <TextField
                                            value={textValues[3] ?? data.seniority ?? ""}
                                            fullWidth
                                            onChange={(e) => handleTextChange(3, e.target.value)}
                                        />
                                        <Grid xs={3} item container={true} direction="row" justifyContent="center" >
                                            <CustomSelect
                                                label='Estudios'
                                                objects={lists.estudios}
                                                val={request.personalData.idEstudioMaximoAlcanzado ?? -1}
                                                typographySize='body2'
                                                handleChangeSelect={(e) => setRequest({ ...request, personalData: { ...request.personalData, idEstudioMaximoAlcanzado: e.target.value } })}
                                            />

                                            <UploadButton label='Subi tu CV' />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container >
                                    {/* IDIOMAS */}
                                    <Grid item xs={12}>
                                        <CustomLabels text={txtPersonalData[6]} titulo={true} />
                                    </Grid>

                                    <Grid item container={true} direction="row"
                                        justifyContent="space-between"
                                        alignItems="center">
                                        <CustomLabels text={txtPersonalData[7]} />
                                        <Grid item xs>
                                            <CustomSelect
                                                label='nivel-ingles'
                                                objects={lists.nivel}
                                                val={request.personalData.idNivelDeIngles ?? -1}
                                                typographySize='body2'
                                                handleChangeSelect={(e) => setRequest({ ...request, personalData: { ...request.personalData, idNivelDeIngles: e.target.value } })}
                                            />
                                        </Grid>
                                        <Grid item xs>
                                            <CustomSelect
                                                label='nivel-ingles-britanico'
                                                objects={lists.nivelInglesBritanicoTxt}
                                                val={request.personalData.idNivelInglesBritanico ?? -1}
                                                typographySize='body2'
                                                handleChangeSelect={(e) => setRequest({ ...request, personalData: { ...request.personalData, idNivelInglesBritanico: e.target.value } })}
                                            />
                                        </Grid>
                                        <Grid item xs style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Button size="small" variant="contained"
                                                target="_blank" rel="noopener noreferrer"
                                                href={URL_TEST_INGLES}>
                                                TEST
                                            </Button>
                                        </Grid>
                                        <Grid item xs style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <UploadButton label='Adjuntar' />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container >
                                    {/* METODOLOGIAS AGILES */}
                                    <Grid item xs={12}>
                                        <CustomLabels text={txtPersonalData[8]} titulo={true} />
                                    </Grid>
                                    <Grid item container={true} direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center">
                                        <CustomLabels text={txtPersonalData[9]} />
                                        <Grid item xs={3}>
                                            <CustomSelect
                                                label={txtPersonalData[9]}
                                                objects={lists.nivel}
                                                val={request.personalData.idNivelMetAgiles ?? -1}
                                                typographySize='body2'
                                                handleChangeSelect={(e) => setRequest({ ...request, personalData: { ...request.personalData, idNivelMetAgiles: e.target.value } })}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>}
        </>
    )
}
