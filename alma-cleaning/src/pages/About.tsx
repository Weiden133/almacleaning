import { motion } from 'framer-motion';
import { TeamMember, Value } from '../types';

const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">О компании AlmaCleaning</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы - команда профессионалов, которая делает ваш дом и офис чистыми и уютными
          </p>
        </motion.div>

        {/* История компании */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">Наша история</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-600 mb-4">
              AlmaCleaning была основана в 2020 году с целью предоставления качественных услуг по уборке помещений в Алматы. 
              За это время мы выросли из небольшой команды в крупную компанию, обслуживающую сотни клиентов.
            </p>
            <p className="text-gray-600">
              Наша миссия - создавать чистоту и комфорт в каждом помещении, где мы работаем. 
              Мы гордимся тем, что помогаем нашим клиентам экономить время и силы, 
              предоставляя профессиональные услуги по уборке.
            </p>
          </div>
        </motion.div>

        {/* Наша команда */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">Наша команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.position}</p>
                  <p className="text-gray-500">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Наши ценности */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6">Наши ценности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const team: TeamMember[] = [
  {
    name: 'Айгуль Нурланова',
    position: 'Генеральный директор',
    description: 'Более 10 лет опыта в управлении клининговыми компаниями',
    image: 'https://placehold.co/400x400?text=CEO'
  },
  {
    name: 'Марат Ахметов',
    position: 'Технический директор',
    description: 'Специалист по подбору и обслуживанию клинингового оборудования',
    image: 'https://placehold.co/400x400?text=Tech+Director'
  },
  {
    name: 'Алия Садыкова',
    position: 'Менеджер по качеству',
    description: 'Контролирует качество предоставляемых услуг',
    image: 'https://placehold.co/400x400?text=Quality+Manager'
  }
];

const values: Value[] = [
  {
    title: 'Качество',
    description: 'Мы стремимся к совершенству в каждом аспекте нашей работы, используя только профессиональное оборудование и экологичные средства.'
  },
  {
    title: 'Надежность',
    description: 'Мы ценим доверие наших клиентов и всегда выполняем свои обязательства в срок.'
  },
  {
    title: 'Профессионализм',
    description: 'Наши сотрудники регулярно проходят обучение и используют современные методы уборки.'
  },
  {
    title: 'Ответственность',
    description: 'Мы берем на себя ответственность за качество нашей работы и всегда готовы исправить любые недочеты.'
  }
];

export default About; 