import { Injectable } from '@nestjs/common';
import * as SvgCaptcha from 'svg-captcha';

@Injectable()
export class CaptchaService {
    createCaptcha(): SvgCaptcha.CaptchaObj {
        return SvgCaptcha.create({
            size: 5,
        })
    }
}