import { Link } from 'react-router-dom';

const people = [
  {
    name: 'Aarsh Shah',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg',
  },
  {
    name: 'Eadan Lay',
    role: 'Co-Founder / water boy',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/%EA%A0%81%EA%A0%9F%EA%A0%98_%EA%A0%9D%EA%A0%A3%EA%A0%8D%EA%A0%86%EA%A0%87.jpg/120px-%EA%A0%81%EA%A0%9F%EA%A0%98_%EA%A0%9D%EA%A0%A3%EA%A0%8D%EA%A0%86%EA%A0%87.jpg',
  },
  {
    name: 'Zachariah Blair',
    role: 'Senior Interface Design Specialist',
    imageUrl: 'https://i1.sndcdn.com/avatars-000912318250-q1a0w6-t240x240.jpg',
  },
  {
    name: 'William Fraser',
    role: 'Lead custodian',
    imageUrl:
      'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
  },
];

export default function Team() {
  return (
    <div className="bg-white py-24 sm:py-32 min-h-screen">
      <div className="absolute top-4 left-4 z-10 rounded-full bg-white p-2">
        <Link to="/dashboard">
              <img
                className="mx-auto h-20 w-auto"
                src="/images/logo.svg"
                alt="Fiscal-Friend logo"
              />
        </Link>
      </div>
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl pr-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet our leadership
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            The team at Fiscal Friend is dedicated to helping you build wealth.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img
                  className="h-16 w-16 rounded-full"
                  src={person.imageUrl}
                  alt=""
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
