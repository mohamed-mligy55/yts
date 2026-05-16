// MovieCardSkeleton.jsx
import React from 'react';

const MovieCardSkeleton = () => {
  return (
    // نستخدم نفس كلاس الهيكل الخارجي 'box' للحفاظ على التنسيق
    <div className='box'>
      <div className='image'>
        {/* مكان الصورة: نثبت الطول والعرض أو الـ aspect ratio في الـ CSS */}
        <div className="img shimmer" style={{ width: '100%', aspectRatio: '2/3' }}></div>
      </div>

      <div style={{ padding: '10px 0' }}>
        {/* مكان العنوان: خط عريض */}
        <div className="shimmer" style={{ height: '20px', width: '80%', marginBottom: '8px' }}></div>
        {/* مكان التاريخ: خط أنحف وأقصر */}
        <div className="shimmer" style={{ height: '14px', width: '40%' }}></div>
      </div>

      {/* الـ info-content الذي يظهر عند الـ hover (اختياري، لكن يفضل محاكاته) */}
      <div className='info-content'>
        <div className="shimmer" style={{ width: '40px', height: '40px', borderRadius: '50%', marginBottom: '10px' }}></div>
        <div className="shimmer" style={{ height: '20px', width: '60%', marginBottom: '5px' }}></div>
        <div className="shimmer" style={{ height: '20px', width: '60%', marginBottom: '5px' }}></div>
        <div className="shimmer" style={{ height: '30px', width: '100%', marginTop: '10px', borderRadius: '4px' }}></div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;