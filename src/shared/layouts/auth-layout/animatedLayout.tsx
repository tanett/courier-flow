import './animation.css';
import React, { PropsWithChildren } from 'react';

export const AnimatedLayout:React.FC<PropsWithChildren> = ({ children }) => {

    return (
        <div className={'animLayout'}>
            <div className={ 'container' }>
                <div className={ 'elem bg2 blur anim1' }/>
                <div className={ 'elem bg2 blur anim2' }/>
                <div className={ 'elem bg1 anim3' }/>
                <div className={ 'elem bg1 anim4' }/>
                <div className={ 'elem bg1 anim5' }/>
                <div className={ 'elem bg1 anim6' }/>
                <div className={ 'elem bg1 anim7' }/>
                <div className={ 'elem bg1 anim8' }/>
                <div className={ 'elem bg2 blur anim9 ' }/>
                <div className={ 'elem bg1 anim10 ' }/>
                <div className={ 'elem bg1 anim11 ' }/>
                <div className={ 'elem bg2 blur anim12 ' }/>
                <div className={ 'elem bg1 anim13 ' }/>
                <div className={ 'elem bg2 blur anim14 ' }/>
                <div className={ 'elem bg2 blur anim15' }/>
                <div className={ 'elem bg2 blur anim16' }/>
                <div className={ 'elem bg2 anim17' }/>
                <div className={ 'elem bg1 anim18' }/>
                <div className={ 'elem bg1 anim19' }/>
                <div className={ 'elem bg1 anim20' }/>
                <div className={ 'elem bg1 anim21' }/>
                <div className={ 'elem bg1 anim22' }/>
                <div className={ 'elem bg1 anim23' }/>
                <div className={ 'elem bg2 blur anim24' }/>
                <div className={ 'elem bg1 anim25' }/>
                <div className={ 'elem bg1 anim26' }/>
                <div className={ 'elem bg2 blur anim27' }/>
            </div>

            { children }
        </div>
    );

};
