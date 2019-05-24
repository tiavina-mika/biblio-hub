import { CLIENT_ORIGIN } from '../config/config'

export const confirm = id => ({
    subject: 'Confirmation de votre inscription',
    html: `
      <a href='${CLIENT_ORIGIN}/confirmer/${id}'>
        cliquez ici pour confirmer
      </a>
    `,      
    text: `Copier et coller ce lien: ${CLIENT_ORIGIN}/confirmer/${id}`
})