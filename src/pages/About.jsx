import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/user/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ACERCA DE'} text2={'NOSOTROS'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Las Amelias nació de la visión de una persona apasionada por la moda femenina, dedicada a ofrecer remeras de alta calidad para mujeres que buscan estilo y autenticidad. Creemos que cada pequeño detalle cuenta, y trabajamos arduamente para asegurarnos de que nuestros productos reflejen esa filosofía. Nuestra misión es proporcionar soluciones únicas y personalizadas que hagan el día a día más cómodo, accesible y satisfactorio.</p>
        <p>Nos esforzamos por crear una experiencia de compra sencilla y placentera, combinando una atención al cliente cercana y personalizada con un compromiso con la innovación constante. Nos enorgullece ser parte de la vida de nuestras clientas y nos motiva el poder impactar positivamente, proporcionando productos que se adapten a sus necesidades y expectativas. Nuestro objetivo es ir más allá de una simple transacción, construyendo relaciones a largo plazo basadas en la confianza y la calidad.</p>
        <b className='text-gray-800'>Nuestra Misión</b>
        <p>Nuestra misión es inspirar a las mujeres a expresar su autenticidad y confianza a través de la moda. Nos comprometemos a ofrecer productos de alta calidad que combinen comodidad, estilo y exclusividad, promoviendo siempre el empoderamiento femenino. Trabajamos cada día para crear una conexión genuina con nuestras clientas, brindándoles prendas que no solo sigan las tendencias, sino que también cuenten una historia de originalidad y pasión</p>
        </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1={'POR QUE'} text2={'ELEGIRNOS'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-29 flex flex.col gap-5'>
          <b>Máxima Calidad</b>
          <p>Cada prenda está confeccionada con los más altos estándares para garantizar máxima calidad y durabilidad, ofreciendo siempre lo mejor para nuestras clientas.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-29 flex flex.col gap-5'>
          <b>Simplicidad</b>
          <p>Nuestra página está diseñada con simplicidad en mente, facilitando una navegación intuitiva y agradable para que encuentres fácilmente lo que buscas.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-29 flex flex.col gap-5'>
          <b>Excelente Atención al Cliente</b>
          <p>Nos enorgullece ofrecer una atención al cliente cercana y personalizada, asegurándonos de que cada experiencia de compra sea única y satisfactoria.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About

