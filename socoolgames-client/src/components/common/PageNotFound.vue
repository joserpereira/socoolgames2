<template>
    <section>
        <div class="text-center mt-15 mt-10">
            <p class="underline">Oops...</p>
        </div>
        <div class="text-center mt-15 mt-5 mb-10">
            <h1 class="mb-3">{{$t('pageNotFound.title')}}</h1>
            <p>{{$t('pageNotFound.description')}}</p>
        </div>
        <div class="text-center mt-15 my-10 bold">
           <a class="button bg-primary p-3 rounded-xl text-white" href="javascript:history.go(-2)">{{$t('pageNotFound.back')}}</a>
        </div>
    </section>

</template>