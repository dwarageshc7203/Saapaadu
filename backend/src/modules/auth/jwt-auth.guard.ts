import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// This guard will be applied to routes that need authentication
@Injectable()

export class JwtAuthGuard extends AuthGuard('jwt') {}
