const { Customer, Address } = require("../models");
const { generateToken } = require('../utils/jwt');

exports.createCustomer = async (req, res) => {
  try {

    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req,res) =>{
  const {mail,password} = req.body;
  try {
    const customer = await Customer.findOne({where : {mail}});
    if (!customer) {
      return res.status(404).json({ message: 'invalid mail' });
    }

    const isMatch = await customer.validPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken({ customerId: customer.customerId, role: customer.role, mail : customer.mail });

    res.cookie('tokenId',token)
    res.status(200).json({success:true,message:"Successfully logged in"})

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      include: [
        {
          model: Address,
          as: "addresses",
        },
      ],
    });

    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCustomer = async (req, res) => {
  try {
    const customer = await Customer.findAll({
      include: [
        {
          model: Address,
          as: "addresses",
        },
      ],
    });

    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Customer.update(req.body, {
      where: { customerId: id },
    });

    if (updated) {
      const updatedCustomer = await Customer.findByPk(id);
      res.status(200).json(updatedCustomer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.destroy({
      where: { customerId: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: "user deleted successfully" });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
