class ValidatorOption {
    failed = false
    rule    = '';
    message = '';
}

class Validator {
    failed  = false;
    rule    = '';
    message = '';

    constructor(opt = new ValidatorOption()) {
        this.failed    = opt.failed;
        this.rule      = opt.rule;
        this.message   = opt.message;
    }

    fails() {
        return this.failed;
    }

    modelResponse() {
        return {
            code   : 400,
            message: this.message || 'failed in request'
        }
    }

    static validate(data, rules = undefined | []) {
        for (let x = 0, rule; rule = rules[x]; x++) {
            if (rule == 'required'    && data == undefined)        return { failed: true, rule: rule };
            else if (rule == 'string'      && typeof data !== 'string') return { failed: true, rule: rule, ruleMessage: `not string` };
            else if (rule == 'array') 
                if (data == undefined)                             return  { failed: true, rule: rule };
                else if (data.constructor.name != 'Array')         return  { failed: true, rule: rule };
            else if (/^min\:\d+$/.test(rule)) 
                if (data) {
                    let exec = /\d*/g.exec(rules);
                    if (data.length == undefined)                  return { failed: true, rule: rule, ruleMessage: `lower of min character '${exec[0]}'` };
                    if (exec        == null)                       return { failed: true, rule: rule, ruleMessage: `lower of min character '${exec[0]}'` };
                    if (data.length  < parseInt(exec[0]))          return { failed: true, rule: rule, ruleMessage: `lower of min character '${exec[0]}'` };
                } else                                             return { failed: true, rule: rule };
            else if (rule == 'url-encode')
                if (
                    /data\:image\/\w+\;base64\,\s/g.test(data) == false
                )                                                  return { failed: true, rule: rule };
            else if (rule == 'datetime')
                if (data == undefined)                             return { failed: true, rule: rule };
                else { 
                    if (/\d+\-\d+-\d+T\d+:\d+:\d+\.\d+Z$/.test(data) == false) {
                                                                   return { failed: true, rule: rule };
                    }
                }
        }

        return { failed: false };
    }

    static errorMessage(field, rule, message) {
        let _message = `this ${field} is @complement@`;

        if (message) { return _message.replace(/\@complement\@/g, message); }
        else         { return _message.replace(/\@complement\@/g, rule);    }
    }
    
    static make(data = {}, opt = {}) {
        let controller = {
            failed  : false,
            rule    : undefined, 
            message : undefined
        };

        if      ( data                  == undefined) controller.failed = true;
        else if ( data.constructor.name != 'Object' ) controller.failed = true;
        if      ( opt                   == undefined) controller.failed = true;
        else if ( opt.constructor.name  != 'Object' ) controller.failed = true;

        if (controller.failed) return new Validator(controller);
        for (let field in opt) {
            let result        = this.validate(data[field], opt[field].split(/\|/g));
            controller.failed = result.failed;

            if (controller.failed) {
                controller.rule    = result.rule;
                controller.message = this.errorMessage(field, result.rule, result.ruleMessage); 
                break;
            }
        }

        return new Validator(controller);
    }
}

module.exports = Validator;