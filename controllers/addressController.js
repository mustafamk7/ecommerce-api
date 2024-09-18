const { Address } = require('../models');


exports.createAddress = async (req, res) => {
  try {
    const { customerId } = req.user;

    const address = await Address.create({ ...req.body, customerId });

    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAddress = async (req, res) => {
  const cusId = req.user.customerId;
  try {
    const address = await Address.findAll({
      where: { customerId: cusId },
    });
    if (address) {
      res.status(200).json(address);
    } else {
      res.status(404).json({ message: 'Address not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const { customerId } = req.user;

    const address = await Address.findByPk(addressId);

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    if (address.customerId !== customerId) {
      return res.status(403).json({ message: 'address cant be update' });
    }


    const [updated] = await Address.update(req.body, {
      where: { id: addressId },
    });

    if (updated) {
      const updatedAddress = await Address.findByPk(addressId);
      res.status(200).json(updatedAddress);
    } else {
      res.status(404).json({ message: 'Address not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const { customerId } = req.user;
    const address = await Address.findByPk(addressId);

    if (address.customerId !== customerId) {
      return res.status(403).json({ message: 'address cant be delete' });
    }

    const deleted = await Address.destroy({
      where: { id: req.params.id },
    });
    console.log(deleted);
    
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Address not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
