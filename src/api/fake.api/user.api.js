import { professionsAsObject as professions } from './professions.api';
import { qualitiesAsObject } from './qualities.api';

const users = [
  {
    _id: '67rdca3eeb7f6fgeed471815',
    name: 'Джон Дориан',
    profession: professions.doctor,
    qualities: [qualitiesAsObject.tedious, qualitiesAsObject.uncertain, qualitiesAsObject.strange],
    completedMeetings: 36,
    rate: 2.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471816',
    name: 'Кокс',
    profession: professions.doctor,
    qualities: [qualitiesAsObject.buller, qualitiesAsObject.handsome, qualitiesAsObject.alcoholic],
    completedMeetings: 15,
    rate: 2.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471817',
    name: 'Боб Келсо',
    profession: professions.doctor,
    qualities: [qualitiesAsObject.buller],
    completedMeetings: 247,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471818',
    name: 'Рэйчел Грин',
    profession: professions.waiter,
    qualities: [qualitiesAsObject.uncertain],
    completedMeetings: 148,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471819',
    name: 'Шелдон Купер',
    profession: professions.physics,
    qualities: [qualitiesAsObject.strange, qualitiesAsObject.tedious],
    completedMeetings: 37,
    rate: 4.6,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471820',
    name: 'Леонард Хофстедтер',
    profession: professions.physics,
    qualities: [qualitiesAsObject.strange, qualitiesAsObject.uncertain],
    completedMeetings: 147,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471821',
    name: 'Говард Воловиц',
    profession: professions.engineer,
    qualities: [qualitiesAsObject.strange, qualitiesAsObject.tedious],
    completedMeetings: 72,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471822',
    name: 'Никола Тесла',
    profession: professions.engineer,
    qualities: [qualitiesAsObject.handsome],
    completedMeetings: 72,
    rate: 5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471823',
    name: 'Моника Геллер',
    profession: professions.cook,
    qualities: [qualitiesAsObject.strange, qualitiesAsObject.uncertain],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471824',
    name: 'Рататуй',
    profession: professions.cook,
    qualities: [qualitiesAsObject.handsome, qualitiesAsObject.buller],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed47181f',
    name: 'Джоуи Триббиани',
    profession: professions.actor,
    qualities: [qualitiesAsObject.uncertain, qualitiesAsObject.strange],
    completedMeetings: 434,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed47181r',
    name: 'Брэд Питт',
    profession: professions.actor,
    qualities: [qualitiesAsObject.handsome],
    completedMeetings: 434,
    rate: 5,
    bookmark: false,
  },
];

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(users);
    }, 1000);
  });

const getById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(users.find((user) => user._id === id));
    }, 500);
  });

export default {
  fetchAll,
  getById,
};
