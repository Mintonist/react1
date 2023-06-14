import { professionsAsObject as professions } from './professions.api';
import { qualitiesAsObject } from './qualities.api';

const users = [
  {
    _id: '67rdca3eeb7f6fgeed471815',
    name: 'Джон Дориан',
    email: 'Jony7351@tw.com',
    sex: 'male',
    profession: professions.doctor._id,
    qualities: [qualitiesAsObject.tedious._id, qualitiesAsObject.uncertain._id, qualitiesAsObject.strange._id],
    completedMeetings: 36,
    rate: 2.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471816',
    name: 'Кокс',
    email: 'white4571@twipet.com',
    sex: 'male',
    profession: professions.doctor._id,
    qualities: [qualitiesAsObject.buller._id, qualitiesAsObject.handsome._id, qualitiesAsObject.alcoholic._id],
    completedMeetings: 15,
    rate: 2.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471817',
    name: 'Боб Келсо',
    email: 'bob007@tw.com',
    sex: 'male',
    profession: professions.doctor._id,
    qualities: [qualitiesAsObject.buller._id],
    completedMeetings: 247,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471818',
    name: 'Рэйчел Грин',
    email: 'green7311@fam.biz',
    sex: 'female',
    profession: professions.waiter._id,
    qualities: [qualitiesAsObject.uncertain._id],
    completedMeetings: 148,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471819',
    name: 'Шелдон Купер',
    email: 'mindgames6878@phis.tech',
    sex: 'male',
    profession: professions.physics._id,
    qualities: [qualitiesAsObject.strange._id, qualitiesAsObject.tedious._id],
    completedMeetings: 37,
    rate: 4.6,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471820',
    name: 'Леонард Хофстедтер',
    email: 'mindes000@phis.tech',
    sex: 'male',
    profession: professions.physics._id,
    qualities: [qualitiesAsObject.strange._id, qualitiesAsObject.uncertain._id],
    completedMeetings: 147,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471821',
    name: 'Говард Воловиц',
    email: 'gov1903@phis.tech',
    sex: 'male',
    profession: professions.engineer._id,
    qualities: [qualitiesAsObject.strange._id, qualitiesAsObject.tedious._id],
    completedMeetings: 72,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471822',
    name: 'Никола Тесла',
    email: 'electro@underground.tech',
    sex: 'male',
    profession: professions.engineer._id,
    qualities: [qualitiesAsObject.handsome._id],
    completedMeetings: 72,
    rate: 5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471823',
    name: 'Моника Геллер',
    email: 'mono@super.com',
    sex: 'female',
    profession: professions.cook._id,
    qualities: [qualitiesAsObject.strange._id, qualitiesAsObject.uncertain._id],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471824',
    name: 'Рататуй',
    email: 'ratatatata@underground.com',
    sex: 'male',
    profession: professions.cook._id,
    qualities: [qualitiesAsObject.handsome._id, qualitiesAsObject.buller._id],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed47181f',
    name: 'Джоуи Триббиани',
    email: 'joe@trib.com',
    sex: 'male',
    profession: professions.actor._id,
    qualities: [qualitiesAsObject.uncertain._id, qualitiesAsObject.strange._id],
    completedMeetings: 434,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed47181r',
    name: 'Брэд Питт',
    email: 'superstar@star.com',
    sex: 'male',
    profession: professions.actor._id,
    qualities: [qualitiesAsObject.handsome._id],
    completedMeetings: 434,
    rate: 5,
    bookmark: false,
  },
];

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(users));
}

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem('users')));
    }, 1000);
  });

const update = (id, data) =>
  new Promise((resolve) => {
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex((u) => u._id === id);
    users[userIndex] = { ...users[userIndex], ...data };
    localStorage.setItem('users', JSON.stringify(users));
    window.setTimeout(function () {
      resolve(users[userIndex]);
    }, 1000);
  });

const remove = (id) =>
  new Promise((resolve, reject) => {
    // throw new Error('5555');
    const users = JSON.parse(localStorage.getItem('users'));
    const userToRemove = users.find((u) => u._id === id);
    const newUsers = users.filter((u) => u._id !== id);
    localStorage.setItem('users', JSON.stringify(newUsers));
    // window.setTimeout(function () {
    //   resolve(userToRemove);
    // }, 1000);
    window.setTimeout(function () {
      reject('555');
    }, 1000);
  });

const getById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem('users')).find((user) => user._id === id));
    }, 500);
  });

export default {
  fetchAll,
  getById,
  update,
  remove,
};
