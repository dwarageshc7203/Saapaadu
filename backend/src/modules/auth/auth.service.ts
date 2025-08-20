import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Vendor } from '../vendor/entities/vendor.entity';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(Vendor) private vendorRepo: Repository<Vendor>,
    private jwtService: JwtService
  ) {}

  async signup(dto: SignupDto): Promise<User> {
    const existing = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
    });
    const savedUser = await this.userRepo.save(user);

    if (dto.role === 'customer') {
      const customer = this.customerRepo.create({
        uid: savedUser.id,
        user: savedUser,
        username: dto.username,
        phoneNumber: dto.phoneNumber,
        veg_nonveg: dto.veg_nonveg,
        address: dto.address,
        area: dto.area,
        city: dto.city,
        state: dto.state,
      });
      await this.customerRepo.save(customer);
    }

    if (dto.role === 'vendor') {
      const vendor = this.vendorRepo.create({
        uid: savedUser.id,
        user: savedUser,
        username: dto.username,
        // Other fields will be filled in later via profile update
        verification: false,
      });
      await this.vendorRepo.save(vendor);
    }

    return savedUser;
  }

  async validateUser(email: string, password: string, role: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) return null;
    
    // Check if user role matches the requested role
    if (user.role !== role) {
      throw new Error(`User is registered as ${user.role}, not ${role}`);
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    return user;
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
