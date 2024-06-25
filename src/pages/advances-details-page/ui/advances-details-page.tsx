import React from 'react';
import { useParams } from 'react-router-dom';
import AdvancesDetails from 'features/advances-details/ui/advances-details';
import NotFoundPage from 'pages/not-found-page/ui/not-found-page';


const AdvancesDetailsPage: React.FC = () => {

    const { id, publicId} = useParams();


    return (
        id ? <AdvancesDetails advanceId={ id }/> : <NotFoundPage/>
    );

};

export default AdvancesDetailsPage;
