const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email', 'avatar', 'createdAt'],
      where: { role: 'user' } // Hanya untuk user biasa
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = req.user.id;

    // Validasi hanya user biasa yang bisa update profil
    if (req.user.role !== 'user') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const [updated] = await User.update(
      { username, email },
      { 
        where: { 
          id: userId,
          role: 'user' // Pastikan hanya user biasa
        } 
      }
    );

    if (!updated) {
      return res.status(404).json({ error: 'User not found or not authorized' });
    }

    const updatedUser = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'avatar']
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    
    if (req.user.role !== 'user') {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const [updated] = await User.update(
      { avatar: `/uploads/${req.file.filename}` },
      { 
        where: { 
          id: userId,
          role: 'user'
        }
      }
    );

    if (!updated) {
      return res.status(404).json({ error: 'User not found or not authorized' });
    }

    res.json({ avatar: `/uploads/${req.file.filename}` });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    // Dapatkan ID user dari JWT atau session
    const userId = req.user.id; // Asumsi menggunakan auth middleware
    
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'avatar', 'role']
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};