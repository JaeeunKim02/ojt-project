import React from 'react';

export const name: React.CSSProperties = {
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
    margin: '10px',
};
export const job: React.CSSProperties = {
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    fontWeight: 'normal',
    fontSize: '15px',
    margin: '10px',
};
export const content: React.CSSProperties = {
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    fontWeight: 'lighter',
    fontSize: '9px',
    margin: '10px',
};

const LeftMiddle: React.FC = () => {
    return (
        <div>
            <p style={name}>김재은 / Jaeeun Kim</p>
            <div style={job}>
                <p>Platform / Jr Software</p>
                <p>Engineer(Server) Intern</p>
            </div>
            <div style={content}>
                <div>
                    <span style={{ fontWeight: 'normal' }}>입사일(Start Date) : </span><span>Feb 26th, 2024</span>
                </div>
            </div>
        </div>
    );
}

export default LeftMiddle;
