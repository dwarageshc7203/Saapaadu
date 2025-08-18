import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Vendor } from '../vendor/entities/vendor.entity';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(Vendor) private vendorRepo: Repository<Vendor>,
  ) {}

  async signup(dto: SignupDto): Promise<User> {
    // ✅ Check existing user by Email
    const existing = await this.userRepo.findOne({ where: { Email: dto.email } });
    if (existing) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // ✅ Create User
    const user = this.userRepo.create({
      UserName: dto.username,
      Email: dto.email,
      Password: hashedPassword,
      Role: dto.role,
    });
    const savedUser = await this.userRepo.save(user);

    // ✅ If role = customer → create customer linked to user
if (dto.role === 'customer') {
  const customer = this.customerRepo.create({
    user: savedUser,
    username: dto.username,
    phoneNumber: dto.phoneNumber,
    veg_nonveg: dto.veg_nonveg,  // ✅ type-safe now
    address: dto.address,
    area: dto.area,
    city: dto.city,
    state: dto.state,
  });
  await this.customerRepo.save(customer);
}

if (dto.role === 'vendor') {
  const vendor = this.vendorRepo.create({
    user: savedUser,
    username: dto.username,
    phoneNumber: dto.phoneNumber,
    veg_nonveg: dto.veg_nonveg,  // ✅ type-safe now
    shopName: dto.shopName,
    shopAddress: dto.shopAddress,
    area: dto.area,
    city: dto.city,
    state: dto.state,
    latitude: dto.latitude,
    longitude: dto.longitude,
    shopImage: dto.shopImage,
    verification: false,
  });
  await this.vendorRepo.save(vendor);
}
    return savedUser;
  }
}
