import { Router } from 'express';
import { FirebaseClient } from '../databases/firebase';
const firebaseClient = new FirebaseClient();

const router = Router();

//@route    POST /fb/account
//@desc     Add account data
router.post('/account', async (req, res, next) => {
  const account = req.body;
  try {
    await firebaseClient.addData(account);
  } catch (error) {
    throw error;
  }

  res.json({
    message: 'success'
  });
});

//cerate layanan anterian
router.post('/La', async (req, res, next) => {
  const La = req.body;
  try {
    await firebaseClient.addDataLa(La);
  } catch (error) {
    throw error;
  }

  res.json({
    message: 'success'
  });
});

//@route    GET /fb/account
//@desc     Get all account data
router.get('/account', async (req, res, next) => {
  let accounts;
  try {
    accounts = await firebaseClient.getData();
  } catch(error) {
    return next(error);
  }

  res.json(accounts);
});

//get data Layanan anterian
router.get('/La', async (req, res, next) => {
  let Las;
  try {
    Las = await firebaseClient.getDataLA();
  } catch(error) {
    return next(error);
  }

  res.json(Las);
});


//@route    GET /fb/account/:id
//@desc     Get account by Id
router.get('/account/:id', async (req, res, next) => {
  const id =  req.params.id;
  let account;
  try {
    account = await firebaseClient.getDataById(id)
  } catch (error) {
    return next(error);
  }

  res.json(account);
});
//get by id LA
router.get('/La/:id', async (req, res, next) => {
  const id =  req.params.id;
  let La;
  try {
    La = await firebaseClient.getDataByIdLa(id)
  } catch (error) {
    return next(error);
  }

  res.json(La);
});

//@route    PUT /fb/account/:id
//@desc     Update account by id
router.put('/account/:id', async (req, res, next) => {
  const id =  req.params.id;
  const update = req.body
  let account;
  try {
    account = await firebaseClient.updateData(id, update)
  } catch (error) {
    return next(error);
  }

  res.json(account);
});

//update LA
router.put('/La/:id', async (req, res, next) => {
  const id =  req.params.id;
  const update = req.body
  let La;
  try {
    La = await firebaseClient.updateDataLa(id, update)
  } catch (error) {
    return next(error);
  }

  res.json(La);
});

//@route    DELETE /fb/account/:id
//@desc     Delete accoubt by id
router.delete('/account/:id', async (req, res, next) => {
  const id =  req.params.id;
  let account;
  try {
    await firebaseClient.deleteData(id)
  } catch (error) {
    return next(error);
  }

  res.json({
    message: 'Data deleted',
  });
});

//delete LA
router.delete('/La/:id', async (req, res, next) => {
  const id =  req.params.id;
  let La;
  try {
    await firebaseClient.deleteDataLa(id)
  } catch (error) {
    return next(error);
  }

  res.json({
    message: 'Data deleted',
  });
});

//@route    GET /fb/account/state/:state
//@desc     Get account by state
router.get('/account/state/:state', async (req, res, next) => {
  const state = req.params.state;
  let account;
  try {
    account = await firebaseClient.getDataByState(state)
  } catch (error) {
    return next(error);
  }

  res.json(account);
});

//get by jenis layanan

router.get('/La/jl/:jl', async (req, res, next) => {
  const jl = req.params.jl;
  let La;
  try {
    La = await firebaseClient.getDataByJL(jl)
  } catch (error) {
    return next(error);
  }

  res.json(La);
});
//@route    GET /fb/account/age/:age
//@desc     Get account by age
router.get('/account/age/:age', async (req, res, next) => {
  const age = Number(req.params.age);
  let accounts;
  try {
    accounts = await firebaseClient.getDataByAge(age);
  } catch(error) {
    return next(error);
  }

  res.send(accounts);
});

router.get('/account/age/:age', async (req, res, next) => {
  const age = Number(req.params.age);
  let accounts;
  try {
    accounts = await firebaseClient.getDataByAge(age);
  } catch(error) {
    return next(error);
  }

  res.send(accounts);
});

//get data by no antri
router.get('/La/na/:na', async (req, res, next) => {
  const na = Number(req.params.na);
  let La;
  try {
    La = await firebaseClient.getDataByna(na);
  } catch(error) {
    return next(error);
  }

  res.send(La);
});

export default router;