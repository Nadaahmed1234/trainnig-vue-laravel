<template>
    <div class="auth-wrapper auth-v1 px-2">
        <div class="auth-inner py-2">
            <!-- Login v1 -->
            <div class="card mb-0">
                <div class="card-body">
                    <a href="javascript:void(0);" class="brand-logo ">
                        <div class="login_logo">
                            <img src="#">

                        </div>
                    </a>

                    <h4 class="card-title mb-1">مرحبا بك في kucu! 👋</h4>

                    <form class="auth-login-form mt-2" method="POST" action="javascript:void(0)" >
                        @csrf

                        <div class="form-group">
                            <label for="email" class="form-label">البريد الإلكتروني</label>
                            <input type="text" class="form-control" v-model="auth.email" id="email" name="email" placeholder="البريد الإلكتروني" value="" />

                        </div>

                        <div class="form-group">
                            <div class="d-flex justify-content-between">
                                <label for="password">كلمه المرور</label>

                            </div>

                            <div class="input-group input-group-merge form-password-toggle">
                                <input type="password" v-model="auth.password" class="form-control form-control-merge" id="password" name="password" tabindex="2" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" aria-describedby="login-password" />
                                <div class="input-group-append">
                                    <span class="input-group-text cursor-pointer"><i data-feather="eye"></i></span>
                                </div>
                            </div>

                        </div>
                        <div class="form-group">
                            <div class="custom-control custom-checkbox">
                                <input class="custom-control-input" type="checkbox" id="remember-me" tabindex="3" />
                                <label class="custom-control-label" for="remember-me"> تذكرني </label>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-block" tabindex="4">تسجيل دخول</button>
                        <button type="submit" :disabled="processing" @click="login" class="btn btn-primary btn-block">
                            {{ processing ? "Please wait" : "Login" }}
                        </button>
                    </form>

                </div>
            </div>
            <!-- /Login v1 -->
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name:"login",
        data(){
            return {
                auth:{
                    email:"",
                    password:""
                },
                processing:false
            }
        },
        methods:{
            ...mapActions({
                signIn:'auth/login'
            }),
            async login(){
                this.processing = true
                await axios.get('/sanctum/csrf-cookie')
                await axios.post('/login',this.auth).then(({data})=>{
                    this.signIn()
                }).catch(({response:{data}})=>{
                    alert(data.message)
                }).finally(()=>{
                    this.processing = false
                })
            },
        }
    }
</script>