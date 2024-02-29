import {styles} from './RightComponent';
import React from 'react';
import i18n from '../../i18n';
import {useTranslation} from 'react-i18next';

const content: React.CSSProperties = {
    fontWeight: 'normal',
    fontSize: '10px',
};

const RightContent: React.FC<{ lan: string }> = ({ lan }) => {
    const { t } = useTranslation();
    i18n.changeLanguage(lan);

    return(
        <div className={lan} style={styles}>
            <div style={content}>
                <p>{t('comment1')}</p>
                <p style={{fontWeight:'lighter'}}>{t('comment2')}</p>
            </div>
            <div style={content}>
                <p>{t('comment3')}</p>
                <p style={{fontWeight:'lighter'}}>{t('comment4')}</p>
            </div>
            <div style={content}>
                <p>{t('comment5')}</p>
                <p style={{fontWeight:'lighter'}}>{t('comment6')}</p>
                <p style={{fontWeight:'lighter'}}>{t('comment7')}</p>
            </div>
        </div>
    );
};

export default RightContent;
