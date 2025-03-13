import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');
export default pb;


export async function allFilms() {
  const records = await pb.collection('films').getFullList({ sort: 'date_pro' });
    let films = records.map(film => {
    film.imgUrl = pb.files.getURL(film, film.image);
    return film; 
  });
  return films; 
}


export async function allActivites() {
const records = await pb.collection('activites').getFullList({ sort: 'date' }); 
let activites = records.map(activite => {
    activite.imgUrl = pb.files.getURL(activite, activite.image);
    return activite; 
  });
return records ;
}

export async function allInvitesByAgentName() {
  const records = await pb.collection('invites').getFullList({ sort: 'nom, prenom' });
    let invites = records.map(invite => {
    invite.imgUrl = pb.files.getURL(invite, invite.image);
    return invite; 
  });
  return invites; 
}


export async function OneID(id) {
    let film = await pb.collection('films').getOne(id) ;
    film.imageUrl = pb.files.getURL(film, film.image);
    return film; 
}

export async function OneIDAct(id) {
    let activite = await pb.collection('activites').getOne(id, { expand: 'invites' }) ;
    activite.imageUrl = pb.files.getURL(activite, activite.image);
    return activite; 
}

export async function OneIDInv(id) {
    let invite = await pb.collection('invites').getOne(id) ;
    invite.imageUrl = pb.files.getURL(invite, invite.image);
    return invite; 
}


export async function ActInvitesById(id) {
const records = await pb.collection('activites').getFullList({ filter: `invites.id='${id}'` , expand: 'invites'});
return records;
}

export async function ActInvitesByName(nom) {
  const records = await pb.collection('activites').getFullList({ filter: `invites.nom='${nom}'` , expand: 'invites'});
  return records;
}

export async function updateActiviteById(id, data) {
  await pb.collection('activites').update(id, data) ;
} 


