import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Masters = () => {
  const [masters, setMasters] = useState([]);

  useEffect(() => {
    axios.get('/api/masters')
      .then(res => { console.log(res.data); setMasters(res.data.masters); })
      .catch(() => setMasters([]));
  }, []);

  return (
    <section className="masters-section">
      <h2>Наши мастера</h2>
      <div className="masters-list">
        {Array.isArray(masters) && masters.map((master, idx) => (
          <motion.div
            className="master-card"
            key={master.id || idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h3>{master.name}</h3>
            <p>{master.description}</p>
            {master.phone && <a href={`tel:${master.phone}`}>{master.phone}</a>}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Masters; 