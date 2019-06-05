import React from 'react';
import { Link } from 'react-router-dom';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

const COLORS = {
	aqua: {
		backgroundColor: '#00c0ef',
		color: '#fff'
	},
	red: {
		backgroundColor: '#dd4b39',
		color: '#fff'
	},
	yellow: {
		backgroundColor: '#f39c12',
		color: '#fff'
	},
	green: {
		backgroundColor: '#43a047',
		color: '#fff'
	}
};

const Card = ({ color, count, title, icon, href,addHref }) => (
	<div
		className="dashboard-card"
		style={{
			backgroundColor: COLORS[color].backgroundColor,
			color: COLORS[color].color,
			borderRadius: 2,
			boxShadow: '0 1px 1px rgba(0, 0, 0, .1)',
			position: 'relative'
		}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{ padding: 10 }}>
                <h3 style={{
                    zIndex: 5,
                    fontSize: '32px',
                    fontWeight: 'bold',
                    margin: '0 0 8px 0',
                    whiteSpace: 'nowrap',
                    padding: 0,
                }}>{count}</h3>
                <p style={{
                    zIndex: 5,
                    fontSize: '14px',
                    margin: '0 0 8px',
                    fontFamily: 'Nunito'
                }}>{title}</p>
            </div>
            <div className="dashboard-card-icon">
                {icon}
		    </div>
        </div>
		<Link
			to={href}
			style={{
				position: 'relative',
				display: 'block',
				textAlign: 'center',
				padding: '5px 0',
				color: 'rgba(255,255,255,0.8)',
				zIndex: 10,
				backgroundColor: 'rgba(0,0,0,0.1)',
				textDecoration: 'none',
				fontSize: '13px'
			}}>
			Ajouter
			<Link to={addHref} style={{color: '#fff', textDecoration: 'none'}}>
				<PlaylistAddIcon style={{ marginLeft: 8, marginBottom: -7, fontSize: 18 }}/>
			</Link>
		</Link>
	</div>
);

export default Card;