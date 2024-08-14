import React from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from 'pages/not-found-page/ui/not-found-page';
import CreditsDetails from 'features/credits-details/ui/credits-details';


const CreditsDetailsPage: React.FC = () => {

    const { id } = useParams();


    return (
        id ? <CreditsDetails creditId={ id }/> : <NotFoundPage/>
    );

};

export default CreditsDetailsPage;
