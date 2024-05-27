import express from 'express';
import logger from '../Middleware/logger.js';

import { newStaff, deleteStaff, updateStaff, lookupStaff } from '../Models/staff.js';